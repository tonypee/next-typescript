import * as React from 'react';
import Layout from '../components/layout';
import db from '../db'
import { firestore } from 'firebase';
import { ssToData } from '../core/utils';

interface Props {
  data:any[]
}

export default class About extends React.Component<Props, Props> {

  constructor() {
    super()
    this.state = {
      data: [],
    };
  }
  static async getInitialProps ({ query }) {
    return {
      data: await db.collection('test').get().then(ssToData)
    }
  }
  
  componentDidMount() {
    this.setState({
      data: this.props.data
    });

    db.collection("test").onSnapshot(ss => {
      this.setState({
        data: ssToData(ss)
      })
    })
  }
  render() {
    console.log(this.props.data)
    return (
      <Layout title="About us">
        <div>About us:</div>
        {this.state.data.map((d, ix) => 
          <div key={ix}>{d.message}</div>
        )}
      </Layout>
    )
  }
}

