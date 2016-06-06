class PatientName extends React.Component {
  sendName(event) {
    let $input = $(event.nativeEvent.target).parent().find('input');
    let name = $input.val();
    if (name.length > 0) {
      this.props.enterName($(event.nativeEvent.target).parent().find('input').value);
    } else {
      $input.css('box-shadow', '0 0 4px #f00');
      setTimeout(() => { $input.css('box-shadow', ''); }, 200);
      setTimeout(() => { $input.css('box-shadow', '0 0 4px #f00'); }, 400);
      setTimeout(() => { $input.css('box-shadow', ''); }, 600);
    }
  }
  render() {
    return (
      <div>
        <h2>{this.props.pageTitle}</h2>
        <div className="name-wrapper">
          <input className="name-input" placeholder="Name" />
          <button className="name-button" onClick={this.sendName.bind(this)}>Continue</button>
        </div>
      </div>
    );
  }
}

PatientName.propTypes = {
};
