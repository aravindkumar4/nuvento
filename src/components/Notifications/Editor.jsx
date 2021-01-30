import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ColorArray = ['#FF0000', '#001F3F', '#0074D9', '#7FDBFF',
  '#39CCCC', '#3D9970', '#2ECC40', '#01FF70',
  '#FFDC00', '#FF851B', '#FF4136', '#85144B',
  '#F012BE', '#B10DC9', '#111111', '#AAAAAA'
]

const CustomToolbar = () => (
  <div id="toolbar">
    <div class="SendButtonArea">
      <Button aria-label="click here to send" variant="outlined" color="secondary">Send</Button>
    </div>
    <div class="InbuiltToolBar">
      <select className="ql-color">
        {ColorArray.map(option =>
          <option key={option} value={option}>
            {option}
          </option>
        )}
        <option selected />
      </select>
      <IconButton color="primary" className="ql-attachment"><i class="material-icons">attach_file</i></IconButton>
      <IconButton color="primary" className="ql-bold"></IconButton>
      <IconButton color="primary" className="ql-link"></IconButton>
      <IconButton color="primary" className="ql-image"></IconButton>
    </div>
    <div class="DeleteRight">
      <IconButton color="primary"><i class="material-icons">delete_outline</i></IconButton>
    </div>
  </div>
);

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorHtml: "" };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(html) {
    this.setState({ editorHtml: html })
  }

  render() {
    return (
      <div className="text-editor">
        <ReactQuill
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
          theme={"snow"} // pass false to use minimal theme
        />
        <CustomToolbar />
      </div>
    );
  }
}

Editor.modules = {
  toolbar: {
    container: "#toolbar",
  },
  clipboard: {
    matchVisual: false,
  },
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color"
];

Editor.propTypes = {
  placeholder: PropTypes.string
};

export default Editor;  