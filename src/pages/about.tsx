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

export default class About extends React.Component<Props, Props> {

  static async getInitialProps({ query }) {
    const page = await api.getPage('about')
    return {
      content: page.content,
    }
  }

  render() {
    return (
      <Layout title="About us">
        <div>About us:</div>
        {this.props.content}
      </Layout>
    )
  }
}