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
    this.model.setInput((e.target as any).value);
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
      </Layout>
    )
  }
}

class AboutModel {
  @observable todos:any = {};
  @observable inputValue:string = '';

  constructor(todos) {
    this.todos = todos;

    api.watchTodos(todos => {
      this.todos = todos;
    })
  }

  @action add(docId) {
    api.addTodo(this.inputValue)
    this.inputValue = ''
  }

  @action delete(docId) {
    api.deleteTodo(docId)
  }

  @action setInput(input:string) {
    this.inputValue = input;
  }
}