class Header extends React.Component {
  render () {
    return (
      <div>
        <h1>Neuromuscular Data Tool</h1>
        <div>{this.props.path}</div>
        {(this.props.path.length > 0)? <div onClick={this.props.back}>Back</div> : ''}
      </div>
    );
  }
}

Header.propTypes = {
  path: React.PropTypes.string
};
