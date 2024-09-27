import * as React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem as BaseMenuItem } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function UserDropDown() {
    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="dropdown-container">
            <Dropdown>
                <MenuButton>
                    <AccountCircleIcon sx={{ mr: 1 }} />
                    {user.name}
                </MenuButton>
                <Menu slots={{ listbox: AnimatedListbox }} style={{ zIndex: 1300 }}>
                    <MenuItem onClick={() => console.log('Profile')}>
                        <AccountCircleIcon sx={{ mr: 1, color: '#F9BE32' }} />
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <LogoutIcon sx={{ mr: 1, color: '#F9BE32' }} />
                        Log out
                    </MenuItem>
                </Menu>
            </Dropdown>
        </div>
    );
}

const Listbox = styled('ul')`
  position: absolute;
  top: 10px;
  left: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 0.875rem;
  padding: 8px 0;
  margin: 0;
  width: 140px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  background-color: white;
  transition: opacity 200ms ease-in, transform 200ms ease-in;

  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }
  
  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }
      .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }

`;

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
    const { ownerState, ...other } = props;
    const popupContext = React.useContext(PopupContext);

    if (popupContext == null) {
        throw new Error(
            'The `AnimatedListbox` component cannot be rendered outside a `Popup` component',
        );
    }

    const verticalPlacement = popupContext.placement.split('-')[0];

    return (
        <CssTransition
            className={`placement-${verticalPlacement}`}
            enterClassName="open"
            exitClassName="closed"
        >
            <Listbox {...other} ref={ref} />
        </CssTransition>
    );
});

AnimatedListbox.propTypes = {
    ownerState: PropTypes.object.isRequired,
};

const MenuItem = styled(BaseMenuItem)`
  list-style: none;
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;
  font-weight: 500;
  background-color: white;
  transition: background-color 200ms ease-in;

  &:hover {
    background-color: #fde9b9;
  }
`;

const MenuButton = styled(BaseMenuButton)`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  background-color: #F9BE32;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 200ms ease-in;
  &:hover {
    background-color: #e5a726;
  }
`;
