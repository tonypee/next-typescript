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
    const page = await api.getPage('contact')
    return {
      content: page.content,
    }
  }

  render() {
    return (
      <Layout title="Contact us">
        <div>Contact us:</div>
        {this.content}
      </Layout>
    )
  }
}