class MeasureSelector extends React.Component {
  select(event) {
    this.props.sendId(parseInt(event.nativeEvent.target.dataset.id, 10));
  }
  render() {
    let measures = this.props.measures.map ( measure => {
      return <div onClick={this.select.bind(this)} data-id={measure.id} key={measure.id}>{measure.title}</div>
    });

    return (
      <div>
        <h2>Measures</h2>
        {measures}
      </div>
    );
  }
}

MeasureSelector.propTypes = {
  measures: React.PropTypes.array
};
