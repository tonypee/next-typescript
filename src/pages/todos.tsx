import * as React from 'react';
import Layout from '../components/layout';
import db from '../core/db'
import { firestore } from 'firebase';
import { observable } from 'mobx';
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
            onChange={e => this.model.onInputChange(e)} 
            onKeyPress={e => this.model.onInput(e)} 
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

  onInputChange(e) {
    this.inputValue = (e.target as any).value;
  }

  onInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == 'Enter') {
      api.addTodo(this.inputValue)
      this.inputValue = ''
    }
  }

  delete(docId) {
    api.deleteTodo(docId)
  }
}