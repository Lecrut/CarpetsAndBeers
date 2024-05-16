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
import { Grid } from '@mui/material'
import Badge from '@mui/material/Badge'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PhoneIcon from '@mui/icons-material/Phone'
import { FaBasketShopping } from 'react-icons/fa6'
import { Link, NavLink } from 'react-router-dom'

const pages = ['Kontakt', 'Lista życzeń', 'Koszyk']
const settings = ['profile', 'Ustawienia', 'Wyloguj']

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop */}
          <SportsBarIcon
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
              </Box>
            </Grid>
          </Grid>

          {/* Mobile */}

          <SportsBarIcon
            color="secondary"
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
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
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Grid>
          </Grid>

          {/* Menu */}
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link to={`/${setting}`}>
                    <Typography textAlign="center">{setting}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
