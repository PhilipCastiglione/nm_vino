class TopLevelSelector extends React.Component {
  select(event) {
    this.props.sendId(parseInt(event.nativeEvent.target.dataset.id, 10));
  }
  render() {
    let records = this.props.records.map ( record => {
      return <div onClick={this.select.bind(this)} data-id={record.id} key={record.id}>{record.title}</div>
    });

    return (
      <div>
        <h2>{this.props.pageTitle}</h2>
        {records}
      </div>
    );
  }
}

TopLevelSelector.propTypes = {
  records: React.PropTypes.array
};
