# jun/13/2025 15:17:23 by RouterOS 7.8
# software id = 
#
/interface ethernet
set [ find default-name=ether1 ] disable-running-check=no
set [ find default-name=ether2 ] disable-running-check=no
set [ find default-name=ether3 ] disable-running-check=no
set [ find default-name=ether4 ] disable-running-check=no
set [ find default-name=ether5 ] disable-running-check=no
set [ find default-name=ether6 ] disable-running-check=no
set [ find default-name=ether7 ] disable-running-check=no
set [ find default-name=ether8 ] disable-running-check=no
set [ find default-name=ether9 ] disable-running-check=no
set [ find default-name=ether10 ] disable-running-check=no
set [ find default-name=ether11 ] disable-running-check=no
/disk
set slot1 slot=slot1
set slot2 slot=slot2
set slot3 slot=slot3
set slot4 slot=slot4
/interface wireless security-profiles
set [ find default=yes ] supplicant-identity=MikroTik
/port
set 0 name=serial0
/ip address
add address=192.168.56.105/24 interface=ether1 network=192.168.56.0
add address=10.10.10.1/30 interface=ether2 network=10.10.10.0
/ip dhcp-client
add interface=ether1
/ip firewall filter
add action=accept chain=input comment="Permitir ping" protocol=icmp
add action=accept chain=forward
/ip route
add dst-address=192.168.56.0/24 gateway=10.10.10.1
add dst-address=10.10.20.2/32 gateway=10.10.20.1
