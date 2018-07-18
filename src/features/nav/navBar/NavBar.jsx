import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import { Menu, Container, Button } from 'semantic-ui-react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import SignedInMenu from '../NavBar/Menus/SignedInMenu'
import SignedOutMenu from '../NavBar/Menus/SignedOutMenu'
import { openModal } from '../../modals/modalActions'

const actions = {
    openModal
}

const mapState = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
})

class NavBar extends Component {

    handleSignIn = () => {
        this.props.openModal('LoginModal')
    };

    handleRegister = () => {
        this.props.openModal('RegisterModal')
    };

    handleSignOut = () => {
        this.props.firebase.logout();
        this.props.history.push('/');
    };

    render() {
        const { auth, profile } = this.props;
        const authenticated = auth.isLoaded && !auth.isEmpty;
        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item as={Link} to='/' header>
                        <img src="/assets/logo.png" alt="logo" />
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/events' name="Exercises" />
                    <Menu.Item as={NavLink} to='/test' name="Test Area" />

                    {authenticated &&
                        <Menu.Item as={NavLink} to='/people' name="People" />}

                    {authenticated &&
                        <Menu.Item>
                            <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create +" />
                        </Menu.Item>}
                    {authenticated ? (
                        <SignedInMenu profile={profile} signOut={this.handleSignOut} />
                     ) : (
                     <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister}/>
                     )}
                </Container>
            </Menu>
        )
    }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));