import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';

const emptyEvent = {
  title: '',
  date: '',
  plane: '',
  variations: '',
  hostedBy: '',
}

class EventForm extends Component {
  state = {
    event: emptyEvent
    }

componentDidMount() {
      if (this.props.selectedEvent !== null) {
        this.setState({
          event: this.props.selectedEvent
        });
      };
    };

componentWillReceiveProps(nextProps) {
  if (nextProps.selectedEvent !== this.props.selectedEvent) {
    this.setState({
      event:nextProps.selectedEvent || emptyEvent
    })
  }
}
  

onFormSubmit = (evt) => {
  evt.preventDefault();
  if (this.state.event.id) {
    this.props.updateEvent(this.state.event);
  } else {
    this.props.createEvent(this.state.event)  
  }
}

onInputChange = (evt) => {
  const newEvent = this.state.event;
  newEvent[evt.target.name] = evt.target.value
  this.setState({
    event: newEvent
  })
}

  render() {
    const{handleCancel} = this.props;
    const {event} = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Exercise Name</label>
            <input name='title' onChange={this.onInputChange} value={event.title} placeholder="Name of exercise" />
          </Form.Field>
          <Form.Field>
            <label>Date Added</label>
            <input name='date' onChange={this.onInputChange} value={event.date} type="date" placeholder="Date added" />
          </Form.Field>
          <Form.Field>
            <label>Primary Plane of Movement</label>
            <select name='plane' value={this.state.value} onChange={this.onInputChange}>
            <option value="frontalPlane">Frontal</option>
            <option value="sagitalPlane">Sagital</option>
            <option value="transversePlane">Transverse</option>
          </select>
          </Form.Field>
          <Form.Field>
            <label>Variations</label>
            <input name='varitations' onChange={this.onInputChange} value={event.venue} placeholder="Variations of exercise" />
          </Form.Field>
          <Form.Field>
            <label>Resistance Type</label>
            <input name='hostedBy' onChange={this.onInputChange} value={event.hostedBy} placeholder="Barbell, Dumbbell, Manual, etc." />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={handleCancel}type="button">Cancel</Button>
        </Form>
      </Segment>
    )
  }
}

export default EventForm