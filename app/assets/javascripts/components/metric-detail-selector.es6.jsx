class MetricDetailSelector extends React.Component {
  select(event) {
    this.props.sendId(parseInt(event.nativeEvent.target.dataset.id, 10));
  }
  render() {
    let metricDetails = this.props.metricDetails.map ( metricDetail => {
      return <div onClick={this.select.bind(this)} data-id={metricDetail.id} key={metricDetail.id}>{metricDetail.description}</div>
    });

    return (
      <div>
        <h3>{this.props.metricCategory.title}</h3>
        <h4>{this.props.metric.title}</h4>
        {metricDetails}
      </div>
    );
  }
}

MetricDetailSelector.propTypes = {
  metricDetails: React.PropTypes.array
};
