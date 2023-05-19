#!/bin/bash

# Obtener el estado actual de la batería
battery_status=$(cat /sys/class/power_supply/BAT0/status)
battery_capacity=$(cat /sys/class/power_supply/BAT0/capacity)

# Definir los iconos de carga y descarga
charging_icon=""
discharging_icon=""

# Mostrar el estado de la batería con iconos
echo "$battery_capacity%"
if [ "$battery_status" == "Charging" ]; then
    echo "$charging_icon"
elif [ "$battery_status" == "Discharging" ]; then
    echo "$discharging_icon"
else
    echo ""
fi
