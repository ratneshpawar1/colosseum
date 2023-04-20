import React from 'react';
import { Modal, Button, Table, Message, Dropdown } from 'semantic-ui-react';
import {
  GoogleReCaptchaProvider,
  withGoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import { SignInButton } from '../TopBar/TopBar';
import { serverPath } from '../../utils';
import firebase from 'firebase/compat/app';
import { SubscribeButton } from '../SubscribeButton/SubscribeButton';

export class VBrowserModal extends React.Component<{
  closeModal: () => void;
  startVBrowser: (
    rcToken: string,
    options: { size: string; region: string }
  ) => void;
  isSubscriber: boolean;
  user?: firebase.User;
  beta?: boolean;
}> {
  state = {
    isFreePoolFull: false,
    region: 'US',
  };

  async componentDidMount() {
    const resp = await window.fetch(serverPath + '/metadata');
    const metadata = await resp.json();
    this.setState({ isFreePoolFull: metadata.isFreePoolFull });
  }
  render() {
    const regionOptions = [
      {
        key: 'US',
        text: 'US East',
        value: 'US',
        image: { avatar: false },
      },
      {
        key: 'EU',
        text: 'Europe',
        value: 'EU',
        image: { avatar: false },
      },
    ];
    if (this.props.beta) {
      regionOptions.push({
        key: 'USW',
        text: 'US West',
        value: 'USW',
        image: { avatar: false },
      });
    }
    const { closeModal, startVBrowser } = this.props;
    const LaunchButton = withGoogleReCaptcha(
      ({ googleReCaptchaProps, large }: any) => (
        <Button
          size="large"
          color={large ? 'orange' : undefined}
          onClick={async () => {
            const rcToken = await (
              googleReCaptchaProps as any
            ).executeRecaptcha('launchVBrowser');
            startVBrowser(rcToken, {
              size: large ? 'large' : '',
              region: large ? this.state.region : 'US',
            });
            closeModal();
          }}
        >
          {large ? 'Launch VBrowser+' : 'Continue with Free'}
        </Button>
      )
    );
    const vmPoolFullMessage = (
      <Message
        size="small"
        color="red"
        icon="hourglass two"
        style={{ width: '380px' }}
        header="No Free VBrowsers Available"
        content={
          <div>
            <div>All of the free VBrowsers are currently being used.</div>
            <div>
              Please consider subscribing for anytime access to faster
              VBrowsers, or try again later.
            </div>
          </div>
        }
      />
    );

    const subscribeButton = !this.props.isSubscriber ? (
      <SubscribeButton user={this.props.user} />
    ) : null;

    return (
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
        useRecaptchaNet
      >
        <Modal open={true} onClose={closeModal as any}>
          <Modal.Header>Launch a VBrowser</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <div>
                You're about to launch a virtual browser to share in this room.
              </div>
              <Table definition unstackable striped celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>WatchParty Free</Table.HeaderCell>
                    <Table.HeaderCell>WatchParty Plus</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>VBrowser Max Resolution</Table.Cell>
                    <Table.Cell>720p</Table.Cell>
                    <Table.Cell>1080p</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>VBrowser CPU/RAM</Table.Cell>
                    <Table.Cell>Standard</Table.Cell>
                    <Table.Cell>Extra</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>VBrowser Session Length</Table.Cell>
                    <Table.Cell>3 hours</Table.Cell>
                    <Table.Cell>24 hours</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Region</Table.Cell>
                    <Table.Cell>Where available </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        selection
                        onChange={(e, { value }) =>
                          this.setState({ region: value })
                        }
                        value={this.state.region}
                        options={regionOptions}
                      ></Dropdown>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>
                      {this.props.user ? (
                        this.state.isFreePoolFull ? (
                          vmPoolFullMessage
                        ) : (
                          <LaunchButton />
                        )
                      ) : (
                        <SignInButton
                          fluid
                          user={this.props.user}
                          isSubscriber={this.props.isSubscriber}
                        />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {this.props.isSubscriber ? (
                        <LaunchButton large />
                      ) : (
                        subscribeButton
                      )}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </GoogleReCaptchaProvider>
    );
  }
}
