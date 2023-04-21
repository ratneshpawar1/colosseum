import React from 'react';
import { serverPath, getUserImage } from '../../utils';
import {
  Icon,
  Popup,
  Button,
  Dropdown,
  Image,
  SemanticSIZES,
} from 'semantic-ui-react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { LoginModal } from '../Modal/LoginModal';
import axios from 'axios';
//import { SubscribeButton } from '../SubscribeButton/SubscribeButton';
import { ProfileModal } from '../Modal/ProfileModal';
import Announce from '../Announce/Announce';
import { InviteButton } from '../InviteButton/InviteButton';

export async function createRoom(
  user: firebase.User | undefined,
  openNewTab: boolean | undefined,
  video: string = ''
) {
  const uid = user?.uid;
  const token = await user?.getIdToken();
  const response = await window.fetch(serverPath + '/createRoom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid,
      token,
      video,
    }),
  });
  const data = await response.json();
  const { name } = data;
  if (openNewTab) {
    window.open('/watch' + name);
  } else {
    window.location.assign('/watch' + name);
  }
}

export class NewRoomButton extends React.Component<{
  user: firebase.User | undefined;
  size?: SemanticSIZES;
  openNewTab?: boolean;
}> {
  createRoom = async () => {
    await createRoom(this.props.user, this.props.openNewTab);
  };
  render() {
    return (
      <Popup
        content="Create a new room with a random URL that you can share with friends"
        trigger={
          <Button
            color="yellow"
            size={this.props.size}
            icon
            onClick={this.createRoom}
            className={this.props.size ? '' : 'toolButton'}
            style={{ borderRadius: '90px' }}
            fluid
          >
            <Icon name="certificate" />
            Create Room
          </Button>
        }
      />
    );
  }
}

type SignInButtonProps = {
  user: firebase.User | undefined;
  fluid?: boolean;
  isSubscriber: boolean;
};

export class SignInButton extends React.Component<SignInButtonProps> {
  public state = { isLoginOpen: false, isProfileOpen: false, userImage: null };

  async componentDidUpdate(prevProps: SignInButtonProps) {
    if (!prevProps.user && this.props.user) {
      this.setState({ userImage: await getUserImage(this.props.user) });
    }
  }

  facebookSignIn = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  };

  googleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  };

  signOut = () => {
    firebase.auth().signOut();
    window.location.reload();
  };

  render() {
    if (this.props.user) {
      return (
        <div
          style={{
            margin: '4px',
            minWidth: '27px',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <Image
            avatar
            src={this.state.userImage}
            onClick={() => this.setState({ isProfileOpen: true })}
          />
          {this.state.isProfileOpen && this.props.user && (
            <ProfileModal
              user={this.props.user}
              userImage={this.state.userImage}
              close={() => this.setState({ isProfileOpen: false })}
              isSubscriber={this.props.isSubscriber}
            />
          )}
        </div>
      );
    }
    return (
      <React.Fragment>
        {this.state.isLoginOpen && (
          <LoginModal
            closeLogin={() => this.setState({ isLoginOpen: false })}
          />
        )}
        <Popup
          basic
          content="Sign in to set your name and picture."
          trigger={
            <Dropdown
              style={{
                height: '40px',
                borderRadius: '100px',
                backgroundColor: '#F5F5DC',
                color: 'black',
              }}
              icon="sign in"
              labeled
              className="icon"
              button
              text="Sign in"
              fluid={this.props.fluid}
            >
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.facebookSignIn}>
                  <Icon name="facebook" />
                  Facebook
                </Dropdown.Item>
                <Dropdown.Item onClick={this.googleSignIn}>
                  <Icon name="google" />
                  Google
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.setState({ isLoginOpen: true })}
                >
                  <Icon name="mail" />
                  Email
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
        />
      </React.Fragment>
    );
  }
}

export class ListRoomsButton extends React.Component<{
  user: firebase.User | undefined;
}> {
  public state = { rooms: [] as PersistentRoom[] };

  componentDidMount() {
    this.refreshRooms();
  }

  refreshRooms = async () => {
    if (this.props.user) {
      const token = await this.props.user.getIdToken();
      const response = await axios.get(
        serverPath + `/listRooms?uid=${this.props.user?.uid}&token=${token}`
      );
      this.setState({ rooms: response.data });
    }
  };

  deleteRoom = async (roomId: string) => {
    if (this.props.user) {
      const token = await this.props.user.getIdToken();
      await axios.delete(
        serverPath +
          `/deleteRoom?uid=${this.props.user?.uid}&token=${token}&roomId=${roomId}`
      );
      this.setState({
        rooms: this.state.rooms.filter((room) => room.roomId !== roomId),
      });
      this.refreshRooms();
    }
  };

  render() {
    return (
      <Dropdown
        style={{ height: '36px', borderRadius: '100px' }}
        icon="group"
        labeled
        className="icon"
        button
        text="My Rooms"
        onClick={this.refreshRooms}
        scrolling
        pointing="top right"
      >
        <Dropdown.Menu>
          {this.state.rooms.length === 0 && (
            <Dropdown.Item disabled>You have no permanent rooms.</Dropdown.Item>
          )}
          {this.state.rooms.map((room: any) => {
            return (
              <Dropdown.Item
                key={room.roomId}
                link="true"
                href={
                  room.vanity ? '/r/' + room.vanity : '/watch' + room.roomId
                }
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {room.vanity ? `/r/${room.vanity}` : room.roomId}
                  <div style={{ marginLeft: 'auto', paddingLeft: '20px' }}>
                    <Button
                      icon
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                        e.preventDefault();
                        this.deleteRoom(room.roomId);
                      }}
                      color="red"
                      size="mini"
                    >
                      <Icon name="trash" />
                    </Button>
                  </div>
                </div>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export class TopBar extends React.Component<{
  user?: firebase.User;
  hideNewRoom?: boolean;
  hideSignin?: boolean;
  hideMyRooms?: boolean;
  isSubscriber: boolean;
  isCustomer: boolean;
  roomTitle?: string;
  roomDescription?: string;
  roomTitleColor?: string;
  showInviteButton?: boolean;
}> {
  render() {
    const subscribeButton = !this.props.isSubscriber ? <></> : null;

    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            paddingBottom: '0px',
            rowGap: '8px',
            maxWidth: '1500px',
            margin: '0 auto',
            padding: '1em 30px',
            zIndex: 100000,
            position: 'relative',
          }}
        >
          {this.props.roomTitle || this.props.roomDescription ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: 10,
                marginLeft: 10,
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  color: this.props.roomTitleColor || 'white',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}
              >
                {this.props.roomTitle?.toUpperCase()}
              </div>
              <div style={{ marginTop: 4, color: 'rgb(255 255 255 / 63%)' }}>
                {this.props.roomDescription}
              </div>
            </div>
          ) : (
            <React.Fragment>
              <a href="/" style={{ display: 'flex' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      color: '#ffa500',
                      fontSize: '30px',
                      lineHeight: '30px',
                    }}
                    className="logo_title"
                  >
                    Colosseum
                  </div>
                </div>
              </a>
            </React.Fragment>
          )}
          {/* <div
            style={{
              display: 'flex',
              marginLeft: '10px',
              alignItems: 'center',
            }}
          >
            <a
              href="https://discord.gg/3rYj5HV"
              target="_blank"
              rel="noopener noreferrer"
              className="footerIcon"
              title="Discord"
            >
              <Icon name="discord" size="big" link />
            </a>
            <a
              href="https://github.com/howardchung/watchparty"
              target="_blank"
              rel="noopener noreferrer"
              className="footerIcon"
              title="GitHub"
            >
              <Icon name="github" size="big" link />
            </a>
          </div> */}
          <Announce />
          <div
            className="mobileStack"
            style={{
              display: 'flex',
              marginLeft: 'auto',
              gap: '4px',
            }}
          >
            {this.props.showInviteButton && <InviteButton />}
            {!this.props.hideNewRoom && (
              <NewRoomButton user={this.props.user} openNewTab />
            )}
            {!this.props.hideMyRooms && this.props.user && (
              <ListRoomsButton user={this.props.user} />
            )}
            {subscribeButton}
            {!this.props.hideSignin && (
              <SignInButton
                user={this.props.user}
                isSubscriber={this.props.isSubscriber}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
