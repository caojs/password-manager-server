import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { injectProps } from '../../helpers/decorators';

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

  @injectProps
  render({ data, checked }) {
    const {
      id,
      title,
      account
    } = data.toObject();
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
    onChange(data.get('id'), e.target.checked);
  }

  onDelete() {
    const {
      data,
      onDelete
    } = this.props;
    onDelete(data.get('id'));
  }

  toId(id) {
    return `item-${id}`;
  }
}
