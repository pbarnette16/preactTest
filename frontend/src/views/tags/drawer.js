import {h, Component} from 'preact'
import Drawer from 'preact-material-components/Drawer'
import List from 'preact-material-components/List'

export default class DrawerPage extends Component {
  render () {
    return (
      <Drawer.TemporaryDrawer ref={drawer => { this.drawer = drawer }}>
        <Drawer.TemporaryDrawerHeader className='mdc-theme--primary-bg'>
            Components
          </Drawer.TemporaryDrawerHeader>
        <Drawer.TemporaryDrawerContent>
          <List>
            <List.LinkItem>
              <List.ItemIcon>home</List.ItemIcon>
                  Home
              </List.LinkItem>
          </List>
        </Drawer.TemporaryDrawerContent>
      </Drawer.TemporaryDrawer>
    )
  }
}
