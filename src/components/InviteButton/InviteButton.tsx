import React, { useState } from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { InviteModal } from '../Modal/InviteModal';

export const InviteButton = () => {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  return (
    <>
      {inviteModalOpen && (
        <InviteModal closeInviteModal={() => setInviteModalOpen(false)} />
      )}
      <Popup
        content="Invite friends!"
        trigger={
          <Button
            color="orange"
            icon
            labelPosition="left"
            fluid
            className="toolButton"
            style={{ minWidth: '12em', borderRadius : "100px" }}
            onClick={() => setInviteModalOpen(true)}
          >
            <Icon name="add user" />
            Invite Friends
          </Button>
        }
      />
    </>
  );
};
