import React from 'react';
import Immutable from 'immutable';
import { Link } from 'react-router';
import { injectProps } from '../../helpers/decorators';
import SideItem from './SideItem';
import { deleteAccount, deleteAccounts } from '../../actionCreators';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedItem: Immutable.Set() };
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillReceiveProps({ accounts }) {
    const {
      accounts: oldAccounts
    } = this.props;

    if (!Immutable.is(accounts, oldAccounts)) {
      const odata = oldAccounts.data;
      const ndata = accounts.data;
      let { selectedItem } = this.state;

      odata
        .forEach(oa => {
          const index = ndata.findIndex(na => na.id === oa.id);
          if (!~index) {
            selectedItem = selectedItem.delete(oa.id);
          }
        });

      this.setState({ selectedItem });
    }
  }

  @injectProps
  render({ username, accounts }) {
    const {
      data,
      errors
    } = accounts;

    const { selectedItem } = this.state;

    return (
      <div>
        <div>
          <span>{username}</span>
          <a href="/logout">Log out</a>
        </div>

        <ul>
          <Link to="/">New</Link>
          {
            selectedItem.size ? (
              <button onClick={() => this.onDelete(selectedItem)}>
                Delete
              </button>
            ) : null
          }
        </ul>

        <ul>
          {
            errors ?
              errors.map((e, i) => (
                <li key={i}>{e.message}</li>
              )) :
              null
          }
        </ul>

        <ul>
          {
            data ?
              data.map(account => (
                <SideItem
                  key={account.id}
                  data={account}
                  checked={selectedItem.get(account.id)}
                  onChange={this.onChange}
                  onDelete={this.onDelete}/>
              )) :
              null
          }
        </ul>
      </div>
    );
  }

  onChange(id, selected) {
    let { selectedItem } = this.state;
    selectedItem = selectedItem[selected ? 'add' : 'delete'](id);
    this.setState({ selectedItem });
  }

  onDelete(id) {
    let arrs = Immutable.Set.isSet(id) ? id.toJS() : [id];
    this.props.deleteAccounts(arrs);
  }
}

export default Sidebar;
