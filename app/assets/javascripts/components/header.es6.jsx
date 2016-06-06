class Header extends React.Component {
  render () {
    return (
      <div>
        <h2>{this.props.pageTitle}</h2>
        <div>{this.props.path}</div>
      </div>
    );
  }
}

Header.propTypes = {
  pageTitle: React.PropTypes.string,
  path: React.PropTypes.array
};
