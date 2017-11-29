import * as React from 'react';
import Layout from '../components/layout';
import db from '../core/db'
import { firestore } from 'firebase';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as api from '../core/api';
import { Horizontal } from '../core/layout';

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
        <Horizontal>
          <div style={{ background: 'green'}}>1</div>
          <div style={{ background: 'red'}}>2</div>
          <div style={{ background: 'yellow'}}>3</div>
          <div style={{ background: 'green'}}>4</div>
        </Horizontal> 
      </Layout>
    )
  }
}