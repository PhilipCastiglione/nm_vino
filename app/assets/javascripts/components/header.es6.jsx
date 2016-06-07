class Header extends React.Component {
  render () {
    return (
      <div>
        <h1>Neuromuscular Data Tool</h1>
        <div className="path">{this.props.path}</div>
        {(this.props.path.length > 2)? <div className="back" onClick={this.props.back}>Back</div> : <div className="back-placeholder">&nbsp;</div>}
      </div>
    );
  }
}

Header.propTypes = {
  path: React.PropTypes.string
};
