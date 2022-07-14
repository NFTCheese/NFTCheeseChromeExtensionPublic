/* 

This is currently only using placeholder data. we can most likely pass in the exact nft data as
parameters to the toolTipDisplay function from the NFTGraph component where we utilize this function
for the tool tip formatting


*/

export const toolTipDisplay: () => string = () => {
  return `
      <div style="display:flex;align-items:center;">
          <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 8V16C2 16.5523 2.44772 17 3 17H16.6202C16.9121 17 17.1895 16.8724 17.3795 16.6508L20.808 12.6508C21.129 12.2763 21.129 11.7237 20.808 11.3492L17.3795 7.34921C17.1895 7.12756 16.9121 7 16.6202 7H3C2.44772 7 2 7.44772 2 8ZM0 8V16C0 17.6569 1.34315 19 3 19H16.6202C17.496 19 18.328 18.6173 18.898 17.9524L22.3265 13.9524C23.2895 12.8289 23.2895 11.1711 22.3265 10.0476L18.898 6.04763C18.328 5.38269 17.496 5 16.6202 5H3C1.34315 5 0 6.34315 0 8Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13ZM15 15C16.6569 15 18 13.6569 18 12C18 10.3431 16.6569 9 15 9C13.3431 9 12 10.3431 12 12C12 13.6569 13.3431 15 15 15Z" fill="currentColor"></path></svg>
          <p style="margin-left:8px;">Selling Price: 2Ξ &#40;<span style="color:#00A146;">1.5x</span> Floor&#41;</p>
      </div>
      <div style="display:flex;align-items:center;">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.5-6H14a.5.5 0 1 0 0-1h-4a2.5 2.5 0 1 1 0-5h1V6h2v2h2.5v2H10a.5.5 0 1 0 0 1h4a2.5 2.5 0 1 1 0 5h-1v2h-2v-2H8.5v-2z"></path></g></svg>
          <p style="margin-left:8px;">Profit:<span style="color:#00A146;">1Ξ</span></p>
      </div>
      <div style="display:flex;align-items:center;">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m15 12 5-4-5-4v2.999H2v2h13zm7 3H9v-3l-5 4 5 4v-3h13z"></path></svg>
          <p style="margin-left:8px;">Transfer: 0x234d... -> 0x1412</p>
      </div>
      <div style="display:flex;align-items:center;">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path></svg>
          <p style="margin-left:8px;">Holding time: 32s</p>
      </div>
      <div style="display:flex;align-items:center;margin-bottom:2px;">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path></svg>
          <p style="margin-left:8px;">Floor price: 2Ξ</p>
      </div>
      <div style="display:flex;align-items:center;margin-bottom:2px;color:#969696;">
          <p >Time: 30/3/20 9:10 UTC</p>
      </div>
      `;
};
