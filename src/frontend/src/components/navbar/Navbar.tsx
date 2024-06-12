import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import SportsBarIcon from '@mui/icons-material/SportsBar'
import { useState } from 'react'
import SearchField from './SearchField'
import { Button, Grid } from '@mui/material'
import Badge from '@mui/material/Badge'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PhoneIcon from '@mui/icons-material/Phone'
import { FaBasketShopping } from 'react-icons/fa6'
import { Link, NavLink } from 'react-router-dom'
import { useUserStore } from '../../stores/UserStore'
import { useNavigate } from 'react-router-dom'

const pages = ['Kontakt', 'Lista życzeń', 'Koszyk']
const settings = ['Profil', 'Ustawienia', 'Wyloguj']

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const navigate = useNavigate()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleMobileLinkCLick = (pageName: string) => {
    setAnchorElNav(null)
    console.log('link click', pageName)

    switch (pageName) {
      case 'Kontakt':
        navigate('/contact')
        break
      case 'Lista życzeń':
        navigate('/wish-list')
        // console.log('Ustawienia')
        break
      case 'Koszyk':
        setUser(null)
        navigate('/shopping-cart')
        break
    }
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleProfileSettings = (setting: string) => {
    setAnchorElUser(null)

    switch (setting) {
      case 'Profil':
        navigate('/profile')
        break
      case 'Ustawienia':
        console.log('Ustawienia')
        break
      case 'Wyloguj':
        setUser(null)
        navigate('/')
        break
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop */}
          <SportsBarIcon
            to="/"
            color="secondary"
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />

          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'inherit',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
                paddingRight: '120px',
              }}
            >
              Beers & carpets
            </Typography>
          </Link>

          <Grid
            container
            spacing={2}
            sx={() => ({
              display: { xs: 'none', md: 'flex' },
            })}
          >
            <Grid item xs={10}>
              <SearchField />
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                <NavLink to="/contact">
                  <IconButton
                    disableRipple={true}
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <PhoneIcon fontSize="large" />
                  </IconButton>
                </NavLink>

                <NavLink to='/wish-list'>
                  <IconButton
                    disableRipple={true}
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={2} color="error">
                      <FavoriteIcon fontSize="large" />
                    </Badge>
                  </IconButton>
                </NavLink>

                <NavLink to='/shopping-cart'>
                  <IconButton
                    disableRipple={true}
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={4} color="error">
                      <FaBasketShopping size={31} />
                    </Badge>
                  </IconButton>
                </NavLink>

              </Box>
            </Grid>
          </Grid>

          {/* Mobile */}

          <NavLink to="/">
            <SportsBarIcon
              color="secondary"
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
            />
          </NavLink>
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'inherit',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Beers & carpets
          </Typography> */}

          <Grid
            container
            spacing={2}
            sx={() => ({
              display: { xs: 'flex', md: 'none' },
            })}
          >
            <Grid item xs={11}>
              <SearchField
                sx={() => ({
                  marginTop: '6px',
                })}
              />
            </Grid>

            <Grid item xs={1}>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => handleMobileLinkCLick(page)}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Grid>
          </Grid>

          {/* Menu */}
          {user ? (
            <Box sx={{ flexGrow: 0, marginLeft: { xs: '40px', md: '130px' } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleProfileSettings(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, marginLeft: { xs: '40px', md: '130px' } }}>
              {/* <Link to="/login">
                <Typography variant="button" color="secondary">
                  Zaloguj
                </Typography>
              </Link> */}
              <Button
                color="secondary"
                variant="contained"
                disableElevation
                onClick={() =>
                  setUser({
                    email: 'test@gmail.com',
                    id: 1,
                    name: 'test',
                    role: 'customer',
                  })
                }
                sx={{ color: 'white' }}
              >
                Zaloguj
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
