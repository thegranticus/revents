import React, { Component } from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid'
import { Segment, Form, Button } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions'


const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: '',
    date: '',
    plane: '',
    variations: '',
    hostedBy: ''
  }

  if(eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  }
}

const actions = {
  createEvent,
  updateEvent
}

class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event)
    }
  

onFormSubmit = (evt) => {
  evt.preventDefault();
  if (this.state.event.id) {
    this.props.updateEvent(this.state.event);
    this.props.history.goBack();
  } else {
    const newEvent = {
      ...this.state.event,
      id: cuid(),
      hostPhotoURL: '/assets/user.png'
    }
    this.props.createEvent(newEvent)
    this.props.history.push('/events')  
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
          <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
        </Form>
      </Segment>
    )
  }
}

export default connect(mapState, actions)(EventForm);