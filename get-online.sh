#!/bin/sh

tailscale status | grep -v 'offline' | awk '{print $2}' | grep -i '^paz' | tr '[:lower:]' '[:upper:]' | paste -sd, -
