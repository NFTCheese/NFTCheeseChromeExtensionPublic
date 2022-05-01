/* global chrome */
// import { gql } from 'graphql-request'
// import axios from 'axios'
import queryString from 'query-string'
import { SERVER_DOMAIN } from './utils/api'
import { User } from './utils/user'
// import { cheeseApiRequest } from './utils/api'

// const GRAPHQL_AUTH_URL =
//   // @ts-ignore
//   chrome.runtime.GRAPHQL_AUTH_URL || 'https://api.nonfungible.tools/graphql'

const pendingOpenSeaRequestBodies: Record<string, string> = {}
chrome.webRequest.onBeforeSendHeaders.addListener(
  ({ requestId, requestHeaders, url }) => {
    const body = pendingOpenSeaRequestBodies[requestId]
    if (body) {
      delete pendingOpenSeaRequestBodies[requestId]
      const bodyData = JSON.parse(body)
      if (bodyData.id) {
        chrome.storage.local.get(
          ['openSeaGraphQlRequests'],
          ({ openSeaGraphQlRequests }) => {
            // TODO: Handle quota exceeded?
            chrome.storage.local.set({
              openSeaGraphQlRequests: {
                ...openSeaGraphQlRequests,
                [bodyData.id]: {
                  url,
                  body,
                  headers: requestHeaders,
                },
              },
            })
          },
        )
      }
    }
  },
  { urls: ['https://api.opensea.io/*'] },
  ['requestHeaders'],
)
chrome.webRequest.onBeforeRequest.addListener(
  ({ tabId, url, requestId, requestBody }) => {
    if (
      typeof tabId === 'number' &&
      /graphql\/$/.test(url) &&
      requestBody?.raw?.length
    ) {
      const decoder = new TextDecoder('utf-8')
      pendingOpenSeaRequestBodies[requestId] = decoder.decode(
        requestBody.raw[0].bytes,
      )
    }
  },
  { urls: ['https://api.opensea.io/*'] },
  ['requestBody'],
)

// const refreshTokenMutation = gql`
//   mutation RefreshToken {
//     refreshToken {
//       success
//       accessToken
//       account {
//         role
//         membershipType
//       }
//     }
//   }
// `

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.method === 'fetch') {
    fetch(request.params.url)
      .then((res) => res.json())
      .then((res) => {
        sendResponse(res)
      })
  } else if (request.method === 'ping') {
    sendResponse('pong')
  } else if (request.method === 'openPopup') {
    const createWindow = (params = {}) => {
      chrome.windows.create({
        url: `index.html?${queryString.stringify(request.params)}`,
        type: 'panel',
        width: 400,
        height: 550,
        ...params,
      })
    }
    chrome.windows
      .getLastFocused()
      .then((window) => {
        const top = window.top || 0
        const left = (window.left || 0) + (window.width || 400) - 400
        createWindow({ left, top })
      })
      .catch(() => {
        createWindow()
      })
  } else if (request.method === 'getUser') {
    // Can't use graphl-request because it depends on XMLHttpRequest,
    // which isn't available in background scripts
    console.log('check token');
    new Promise((resolve) => {
      chrome.storage.sync.get('NFTCheese__token', ({ NFTCheese__token }) => {
        resolve(NFTCheese__token as string)
      })
    }).then((accessToken) => {
      if (typeof accessToken === 'string' && accessToken) {
        fetch(`${SERVER_DOMAIN}/api/auth`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          method: 'GET'
        })
          .then(res => res.json())
          .then((data) => {
            // const {
            //   refreshToken: { accessToken, account },
            // } = json.data
            const user: User = {
              publicAddress: data.publicAddress as string,
              accessToken,
              role: 'MEMBER',
              membershipType: 'LIFETIME',
              isSubscriber: true,
              isFounder: false,
            }

            sendResponse(user)
          })
          .catch(() => {
            console.log(`401`);
            sendResponse(null);
          })
      } else {
        sendResponse(null);
      }
    })

    // fetch(GRAPHQL_AUTH_URL, {
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   // body: JSON.stringify({ query: refreshTokenMutation }),
    //   method: 'POST',
    //   mode: 'cors',
    //   credentials: 'include',
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     const {
    //       refreshToken: { accessToken, account },
    //     } = json.data

    //     sendResponse({
    //       accessToken,
    //       role: account?.role || 'FREE',
    //       membershipType: account?.membershipType,
    //     })
    //   })
  } else if (request.method === 'notify') {
    // Svg images not supported in notifications
    if (request.params.options.iconUrl.endsWith('.svg')) {
      request.params.options.iconUrl = chrome.runtime.getURL('icon.png')
    }
    chrome.notifications.create(
      request.params.id,
      request.params.options,
      (notifiedId) => {
        if (request.params.openOnClick) {
          chrome.notifications.onClicked.addListener((clickedId) => {
            if (clickedId === notifiedId) {
              chrome.tabs.create({ url: request.params.openOnClick })
              chrome.notifications.clear(clickedId)
            }
          })
        }
        sendResponse(notifiedId)
      },
    )
  } else if (request.method === 'clearNotifications') {
    // Svg images not supported in notifications
    request.params.ids.forEach((id: string) => {
      chrome.notifications.clear(id)
    })
  }
  return true
})

chrome.runtime.onMessageExternal.addListener(
  function (request, sender, /* sendResponse */) {
    console.log(sender);
    if (request.accessToken) {
      console.log(request.accessToken);
      chrome.storage.sync.set({ 'NFTCheese__token': request.accessToken }, () => {
        console.log('Saved');
      });
      // handleToken(request.token, false);
    }
  });