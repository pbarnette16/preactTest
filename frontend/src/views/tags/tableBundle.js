import {h} from 'preact'

export default function (props) {
  return (
    <table>
      <thead>
        <tr>
          <th>
              Bundle Size
            </th>
          <th>
              Bundle Cost
            </th>
        </tr>
      </thead>
      <tbody>
        {
          props.bundle.map((bundleItem, num) => {
            return (<tr class={(num % 2) ? 'even' : 'odd'}>
              <td>
                {bundleItem.bundleSize}
              </td>
              <td>
                  ${bundleItem.price}
              </td>
            </tr>)
          })
        }
      </tbody>
    </table>
  )
}
