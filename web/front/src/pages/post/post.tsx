import React from 'react';
import './post.css'
import request from '@/utils/request';
import { Link } from 'umi';
import Comment from '../components/disqus'

export default class extends React.Component<any> {
  constructor(props: any) {
    super(props)
    this.getdata()
  }
  state = {
    post: {
      ID: "",
      Title: "",
      Update: "",
      HTML: "",
      Tags: [{
        Name: "",
      }]
    }
  }

  get = () => {
    return request("/api/public/post", {
      method: "get",
      params: {
        page: this.props.match.params.id,
      },
    })
  }

  getdata = async () => {
    let data = await this.get()
    this.setState({
      post: data.post
    })
  }

  componentDidUpdate() {
    this.highlightCallBack();
    if (this.props.siteinfo)
      document.title = this.state.post.Title + ' · ' + this.props.siteinfo.SiteName
  }

  highlightCallBack = () => {
    document.querySelectorAll("pre code").forEach(block => {
      try { hljs.highlightBlock(block); }
      catch (e) { console.log(e); }
    });
  };

  render() {
    let elements: any = []
    this.state.post.Tags.forEach((tag) => {
      let link = "/tag/" + tag.Name
      elements.push(
        <Link key={tag.Name} to={link}>{tag.Name}</Link>
      )
    }

    )
    return (
      <>
        <section className="container">
          <div className="post">
            <article className="post-block">
              <h1 className="post-title">{this.state.post.Title}</h1>
              <div className="post-tag">
                {elements}
              </div>
              <div className="post-info">{this.state.post.Update}</div>
              <div dangerouslySetInnerHTML={{ __html: this.state.post.HTML }} className="post-content">
              </div>
              <div className="post-info">last updated: {this.state.post.Update}</div>
              <a className="post-info" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">许可协议: "署名-非商用-相同方式共享 4.0" 转载请保留原文链接及作者。</a></article>
          </div>
        </section>
        <Comment title={this.state.post.Title} siteinfo={this.props.siteinfo} />
      </>
    );
  }
}