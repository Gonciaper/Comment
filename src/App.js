import React, { Component } from 'react';
import * as model from './Models/model'



// ------------资源抽象验证--------------
let urlData = { 'verify_url': window.location.href }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      inputValue: '',
      commentNum: '',
    }
    this.valChangeHandle = this.valChangeHandle.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
    this.cancelHandle = this.cancelHandle.bind(this);
    this.favorHandle = this.favorHandle.bind(this);
    // 使得this.setstate能在另一个文件中的使用.通过函数封装绑定实例
    this.update = this.update.bind(this);
    this.verifyInputVal = this.verifyInputVal.bind(this);
  }
  // 提交评论
  submitHandle() {
    const { inputValue } = this.state;
    if (this.verifyInputVal(inputValue)) {
      let data = { 'comment': inputValue, 'verify_url': urlData.verify_url };

      model.insertData(data);
      model.findData(this.update, urlData);
      this.setState({ inputValue: '' });
    } else {
      return false;
    }
  };
  // 清空当前评论框内的内容
  cancelHandle() {
    this.setState({ inputValue: '' });
  };

  // 更新评论框的输入内容
  valChangeHandle(event) {
    this.setState({ inputValue: event.target.value });
  };

  componentDidMount() {
    model.findData(this.update, urlData);
  }
  // 使得setstate的this正确指向app类
  // 一定要记得绑定到类实例中constructer
  update(data) {
    this.setState({ data: data, commentNum: data.length });
  }
  // 验证评论框内的值
  verifyInputVal(textContent) {
    if (textContent && textContent.split(" ").join("").length !== 0) {
      return true;
    } else {
      return false;
    }
  }
  // 点赞
  favorHandle(ele) {
    let inde = ele.target.getAttribute('inde');
    let data = this.state.data[inde];

    // 判断是否为空
    data.favor !== null ?
      data.favor = data.favor + 1
      : data.favor = 1;

    model.updateData(data);
    model.findData(this.update, urlData);

  }
  // 获取当前时间并格式化
  getTime() {
    var myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let hour = myDate.getHours();
    let minu = myDate.getMinutes();
    return `${year}.${month}.${day} ${hour}:${minu}`
  }

  render() {
    const { inputValue} = this.state;
    const { inputHei,inputWid,comCardHei,comCardWid,direct} = this.props;
    let postn='';
    let choiseStyle='';
    switch(direct){
      case "left":
          postn="comment-block-change";
          choiseStyle="input-comment-left";
          break;
      case "right":
          postn="comment-block-change";
          choiseStyle="input-comment-right";
        break;
      default:
          postn="comment-block";
          choiseStyle="input-comment";
          break;
    }
    return (
      <div id="comment">
        <div className={postn} >
        {direct === 'up' ? <InputCard choiseStyle={choiseStyle} inputValue={inputValue} inputWid={inputWid} inputHei={inputHei} submitHandle={this.submitHandle} cancelHandle={this.cancelHandle} valChangeHandle={this.valChangeHandle}></InputCard> : ''}
        {direct === 'left' ? <InputCard choiseStyle={choiseStyle} inputValue={inputValue} inputWid={inputWid} inputHei={inputHei} submitHandle={this.submitHandle} cancelHandle={this.cancelHandle} valChangeHandle={this.valChangeHandle}></InputCard> : ''}
        {direct === 'right' ? <InputCard choiseStyle={choiseStyle} inputValue={inputValue} inputWid={inputWid} inputHei={inputHei} submitHandle={this.submitHandle} cancelHandle={this.cancelHandle} valChangeHandle={this.valChangeHandle}></InputCard> : ''}
        <div className="comment-text" style={{ width: comCardWid }}>
          <div className="top-title">
            <span className="comment-num">{this.state.commentNum}条评论</span>
          </div>
          <div className="comment-text-card">
            {this.state.data.map((item, index) =>
              <CommentCard key={index} item={item} favorHandle={this.favorHandle} index={index} getTime={this.getTime}></CommentCard>
            ).reverse()
            }
          </div>
        </div>
        {direct === 'bottom' ? <InputCard choiseStyle={choiseStyle} inputValue={inputValue} inputWid={inputWid} inputHei={inputHei} submitHandle={this.submitHandle} cancelHandle={this.cancelHandle} valChangeHandle={this.valChangeHandle}></InputCard> : ''}
      </div>
     </div>
    )
  }
}

// 评论输入框组件
const InputCard = ({ inputValue, inputHei, inputWid, submitHandle, cancelHandle, valChangeHandle,choiseStyle }) =>{
return(
  <div className={choiseStyle} style={{ width: inputWid }}>
    <form className="new-comment">
      <div className="author">
        <img src='tx.png' />
      </div>
      <textarea placeholder="写下你的评论..." className="text-a" style={{ height: inputHei }} onChange={valChangeHandle} value={inputValue}>
      </textarea>
      <div className="submit-block">
        <a className="btn btn-send" onClick={submitHandle}>发送</a>
        <a className="cancel" onClick={cancelHandle}>取消</a>
      </div>
    </form>
  </div>
)}

// 评论卡片组件
const CommentCard = ({ item, favorHandle, index, getTime,comCardHei }) => {
  return (
    <div className="sub-comment-text" style={{ height: comCardHei }}>
      <div>
        <div className="author author-area">
          <div><img src="./tx.png" alt="" /></div>
          <div className="info">
            <a className="name">用户1</a>
            <div className="meta">{index + 1}楼 · {getTime()}</div>
          </div>
        </div>
        <div className="comment-wrap">
          <p className="p-text">{item.comment}</p>
          <div className="tool-group">
            <a className="like-button">
              <span className="like-text" onClick={favorHandle} inde={index} >△ {item.favor}赞</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
