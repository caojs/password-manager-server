import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import shallowCompare from 'react-addons-shallow-compare';
import { injectProps } from '../../helpers/decorators';
import style from './SideItem.css';

export default class Item extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  @injectProps
  render({ data, checked }) {
    const {
      id,
      title,
      account
    } = data;
    const idName = this.toId(id);

    return (
      <li>
        <label htmlFor={idName}>

          <input id={idName}
            type="checkbox"
            onChange={this.onChange}
            checked={checked || false}/>

          <span>{title}</span>
          <span>{account}</span>

          {checked ? (
            <div>
              <input type="button" value="delete" onClick={this.onDelete}/>
              <Link to={`/edit/${id}`}>edit</Link>
            </div>
          ) : null}

        </label>
      </li>
    );
  }

  onChange(e) {
    const {
      data,
      onChange
    } = this.props;
    onChange(data.id, e.target.checked);
  }

  onDelete() {
    const {
      data,
      onDelete
    } = this.props;
    onDelete(data.id);
  }

  toId(id) {
    return `item-${id}`;
  }
}
