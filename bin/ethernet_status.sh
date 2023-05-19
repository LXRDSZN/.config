#!/bin/sh
 
echo "%{F#2495e7} $(/usr/sbin/ifconfig wlx58b3fcbe764a | grep "inet " | awk '{print $2}')%{u-}"
 
