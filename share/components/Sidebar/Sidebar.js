import React from 'react';
import Immutable from 'immutable';
import { Link } from 'react-router';
import { injectProps } from '../../helpers/decorators';
import SideItem from './SideItem';
import { deleteAccount, deleteAccounts } from '../../actionCreators';
import MdAccountCircle from 'react-icons/lib/md/account-circle';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import style from './Sidebar.css';

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
      <div className={style.main}>
        <div className={style.user}>
          <span><MdAccountCircle/>{` ${username}`}</span>
          <a href="/logout" title="log out"><FaSignOut/></a>
        </div>

        <ul className={style.actions}>
          <li>
            <Link to="/" className="add-item">New</Link>
          </li>
          {
            selectedItem.size ? (
              <li>
                <button className="delete-all" onClick={() => this.onDelete(selectedItem)}>
                Delete
                </button>
              </li>
            ) : null
          }
        </ul>

        {
          errors ?
            (
              <ul>
                errors.map((e, i) => (
                  <li key={i}>{e.message}</li>
                ))
              </ul>
            ) :
            null
        }

        <ul className={style.list}>
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
