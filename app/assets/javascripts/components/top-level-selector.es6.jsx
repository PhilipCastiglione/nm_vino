class TopLevelSelector extends React.Component {
  select(event) {
    this.props.selectRecord(parseInt(event.nativeEvent.target.dataset.id, 10));
  }
  componentDidMount() {
    $('#flash').css('color', 'green')
    setTimeout(() => { $('#flash').css('color', 'black') }, 100)
  }
  componentDidUpdate() {
    $('#flash').css('color', 'green')
    setTimeout(() => { $('#flash').css('color', 'black') }, 100)
  }
  render() {
    let records = this.props.records.map(record => {
      return <div className="selection" onClick={this.select.bind(this)} data-id={record.id} key={record.id}>{record.title}</div>
    });

    return (
      <div>
        <h2 id="flash">{this.props.pageTitle}</h2>
        {records}
      </div>
    );
  }
}

TopLevelSelector.propTypes = {
  records: React.PropTypes.array
};
