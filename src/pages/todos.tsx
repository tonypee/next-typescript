import * as React from 'react';
import Layout from '../components/layout';
import db from '../core/db'
import { firestore } from 'firebase';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import * as api from '../core/api';
import { addTodo } from '../core/api';

interface Props {
  todos:any[]
}

@observer
export default class About extends React.Component<Props, Props> {
  model: AboutModel;

  constructor(props) {
    super(props)
    this.model = new AboutModel(this.props.todos);
  }

  static async getInitialProps({ query }) {
    const todos = await api.getTodos()
    return {
      todos,
    }
  }

  onInputChange(e) {
    this.model.inputValue = (e.target as any).value;
  }

  onInputKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == 'Enter') {
      this.model.add((e.target as any).value)
    }
  }

  render() {
    return (
      <Layout title="About us">
        <div>Todos:</div>
        
        <div>
          order: 
          <a href="#" onClick={e => this.model.toggleOrder()}>
            {this.model.orderAsc ? 'asc' : 'desc'}
          </a>

          limit: 
          <select onChange={e => this.model.setLimit(e.target.value)}>
            <option value={999}>-</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {Object.entries(this.model.todos).map(([id, todo]) => 
          <div key={id}>{todo.todo} | <a href="#" onClick={e => this.model.delete(id)}>del</a></div>
        )}

        <div>
          <input 
            value={this.model.inputValue} 
            onChange={e => this.onInputChange(e)} 
            onKeyPress={e => this.onInputKeyPress(e)} 
          />
          {this.model.inputValue}
        </div>
        {this.model.saving && 'saving...'}
      </Layout>
    )
  }
}

class AboutModel {
  @observable todos:any = {};
  @observable inputValue:string = '';
  @observable saving:boolean = false;
  @observable orderAsc:boolean = true;
  @observable limit:number = 99999;

  unsubscribe = null;

  constructor(todos) {
    this.todos = todos;
    this.updateWatch()
  }

  updateWatch() {
    this.unsubscribe && this.unsubscribe();
    this.unsubscribe = api.watchTodos(todos => {
      this.todos = todos;
    }, this.limit, this.orderAsc)
  }

  @action async add(value) {
    this.inputValue = ''
    this.saving = true;
    await api.addTodo(value)
    this.saving = false;
  }
  
  @action delete(docId) {
    api.deleteTodo(docId)
  }

  @action toggleOrder() {
    this.orderAsc = !this.orderAsc;
    this.updateWatch();
  }
  
  @action setLimit(limit) {
    this.limit = parseInt(limit);
    this.updateWatch();
  }
}