class DiseaseSelector extends React.Component {
  select(event) {
    this.props.sendId(parseInt(event.nativeEvent.target.dataset.id, 10));
  }
  render() {
    let diseases = this.props.diseases.map ( disease => {
      return <div onClick={this.select.bind(this)} data-id={disease.id} key={disease.id}>{disease.title}</div>
    });

    return (
      <div>
        {diseases}
      </div>
    );
  }
}

DiseaseSelector.propTypes = {
  diseases: React.PropTypes.array
};
