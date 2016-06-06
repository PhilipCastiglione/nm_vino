class Header extends React.Component {
  render () {
    return (
      <div>
        <div className="path">{this.props.path}</div>
        <h1>Neuromuscular Data Tool</h1>
        {(this.props.path.length > 2)? <div className="back" onClick={this.props.back}>Back</div> : <div className="back-placeholder">&nbsp;</div>}
      </div>
    );
  }
}

Header.propTypes = {
  path: React.PropTypes.string
};
