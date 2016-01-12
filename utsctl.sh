#!/bin/sh

uts_bin="/root/uTorrent_Server/utserver"
pid_file="pid/utserver.pid"
settings_path="/root/uTorrent_Server"
config_file="utserver.conf"
log_file="log/ut.log"

start(){

        if [ -s "$pid_file" ]
        then
                kill -s 0 `cat $pid_file` > /dev/null 2>&1
                if  [ "$?" == "0" ]
                then
                        echo "Err: Utorrent seems to be running, PID `cat $pid_file`"
                else
                        echo "Starting Utorrent Server.."
                        cd $settings_path;$uts_bin -settingspath $settings_path -configfile $config_file -logfile $log_file -pidfile $pid_file -daemon
                fi
        else
                echo "Starting Utorrent Server.."
                cd $settings_path;$uts_bin -settingspath $settings_path -configfile $config_file -logfile $log_file -pidfile $pid_file -daemon
        fi
}

stop(){
        if [ -s "$pid_file" ]
        then
                kill `cat $pid_file` > /dev/null 2>&1
                if  [ "$?" == "0" ]
                then
                        echo "Stopping Utorrent Server.."
                        kill `cat $pid_file`
                     #   tail -f /dev/null --pid `cat $pid_file`
                        rm -f $pid_file
                else
			rm -f $pid_file
                        echo "Err: Utorrent seems to be stopped, PID file $pid_file not found or empty"
                fi
        else
                echo "Err: PID file $pid_file not found or empty"
        fi
}
status(){
        if [ -s "$pid_file" ]
        then
                kill -s 0 `cat $pid_file` > /dev/null 2>&1
                if  [ "$?" == "0" ]
                then
                        echo "Utorrent seems to be running, PID `cat $pid_file`"
                else
                        echo "PID file present, but no process with PID `cat $pid_file` running"
                fi
        else
                echo "Utorrent seems to be stopped, PID file $pid_file not found or empty"
        fi
}

case "$1" in
        start)
                start
                ;;
        stop)
                stop
                ;;
        reload)
                stop
                rm -vf $settings_path/settings.dat*
                start
                ;;
        status)
                status
                ;;
        *)
                echo "Usage $0 {start|stop|reload|status}"
                ;;
esac
