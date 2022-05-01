import { Portal } from '@chakra-ui/portal'
import { SCOPED_CLASS_NAME } from './ScopedCSSReset'

export const getOrCreatePortal = () => {
  let portal = document.getElementById('NFTCheese__Portal')
  if (!portal) {
    portal = document.createElement('div')
    portal.id = 'NFTCheese__Portal'
    portal.classList.add(SCOPED_CLASS_NAME)
    document.body.appendChild(portal)
  }
  return { current: portal }
}

const ScopedCSSPortal = ({ children }: React.PropsWithChildren<{}>) => (
  <Portal containerRef={getOrCreatePortal()}>{children}</Portal>
)

export default ScopedCSSPortal
