import React from 'react';
import Immutable from 'immutable';
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
      const odata = oldAccounts.get('data');
      const ndata = accounts.get('data');
      let { selectedItem } = this.state;

      odata
        .forEach(oa => {
          const index = ndata.findIndex(na => na.get('id') === oa.get('id'));
          if (!~index) {
            selectedItem = selectedItem.delete(oa.get('id'));
          }
        });

      this.setState({ selectedItem });
    }
  }

  @injectProps
  render({ username, accounts }) {
    const {
      data = Immutable.List(),
      errors = Immutable.List()
    } = accounts.toObject();

    const { selectedItem } = this.state;

    return (
      <div>
        <div>
          <span>{username}</span>
          <a href="/logout">Log out</a>
        </div>

        {
          selectedItem.size ? (
            <button onClick={() => this.onDelete(selectedItem)}>
            Delete
            </button>
          ) : null
        }

        <ul>
          {
            errors.size ?
              errors.map((e, i) => (
                <li key={i}>{e.get('message')}</li>
              )) :
              null
          }
        </ul>

        <ul>
          {
            data.size ?
              data.map(account => (
                <SideItem
                  key={account.get('id')}
                  data={account}
                  checked={selectedItem.get(account.get('id'))}
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
