import * as React from 'react';
import Layout from '../components/layout';
import db from '../core/db'
import { firestore } from 'firebase';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as api from '../core/api';

interface Props {
  content:any[]
}

@observer
export default class About extends React.Component<Props, Props> {
  
  @observable content;
  
  constructor(props) {
    super(props)
    this.content = props.content 
  }

  static async getInitialProps({ query }) {
    const content = await api.getPage('about')
    return {
      content,
    }
  }

  render() {
    return (
      <Layout title="About us">
        <div>About us:</div>
        {this.content}
      </Layout>
    )
  }
}