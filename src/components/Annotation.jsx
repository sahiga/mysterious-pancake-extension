var $ = require('jquery');
var React = require('react');

var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var sha1 = require('sha1');

//component for annotations
var Annotation = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      notes: []
    };
  },

  componentWillMount: function() {
    // hash the url to get a unique storage id for the webpage
    var docHash = sha1(window.location.href);
    // use the text from the parent as the hashed ID for the
    // notable stored in firebase
    var parentHash = sha1(this.props.parentText);
    this.bindAsArray(new Firebase(
      "https://popping-torch-5999.firebaseio.com/docs/"+docHash+"/notables/"+parentHash+"/notes"),
      "notes");
  },

  componentDidMount: function() {
    // set firebase sync/change listener
  },

  addAnnotation: function() {
    var text = $(React.findDOMNode(this.refs.input));
    this.firebaseRefs["notes"].push({
      text: text.val()
    });
    text.val('');
  },

  render: function(){
    var style = {
      position: "absolute",
      backgroundColor: "#cccccc",
      width: "400px",
      height: "200px",
      borderRadius: "5px",
      opacity: "0.5",
      padding: "5px",
      display: "none",
      zIndex: 1000
      // top: this.props.top,
      // left: this.props.left
    };

    //render a custom div to the side of the tag.
    return (
      <div className="conor" style={style}>
        <ul className="mrgn-ul" ref="list">
          {this.state.notes.map(function(note) {
            return <li className="mrgn-li">{note.text}</li>
          })}
        </ul>
        <input ref="input"/>
        <button onClick={this.addAnnotation}>Comment</button>
      </div>
    )
  }

});

module.exports = Annotation;
