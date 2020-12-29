#!/bin/bash

i=1
n=`ls $1/originals | wc -l`
spin="/-\\|"
k=1
c[0]=" "
c[1]=" "
c[2]=" "
c[3]=" "
c[4]=" "
c[5]=" "
c[6]=" "
c[7]=" "
c[8]=" "
c[9]=" "
final="="

if [ ! -d $1/$3p ]
then
    mkdir -p $1/$3p
    printf "Folder $1/$3p created.\n"
fi

for f in $1/originals/*
do
    cwebp -q 100 -resize $2 $3 -o $1/$3p/${f#$1/originals/} $f > /dev/null 2>&1 &
    pid=$!
    while [ -d /proc/$pid ]
    do
        c[$p]=${spin:k++%${#spin}:1}
        printf "\r[${c[0]}${c[1]}${c[2]}${c[3]}${c[4]}${c[5]}${c[6]}${c[7]}${c[8]}${c[9]}] Processing image $i/$n..."
        sleep .2
    done
    i=$((i+1))
    p=$((10*i/n))
    if [ $p -gt 0 ] ; then c[0]=$final ; fi
    if [ $p -gt 1 ] ; then c[1]=$final ; fi
    if [ $p -gt 2 ] ; then c[2]=$final ; fi
    if [ $p -gt 3 ] ; then c[3]=$final ; fi
    if [ $p -gt 4 ] ; then c[4]=$final ; fi
    if [ $p -gt 5 ] ; then c[5]=$final ; fi
    if [ $p -gt 6 ] ; then c[6]=$final ; fi
    if [ $p -gt 7 ] ; then c[7]=$final ; fi
    if [ $p -gt 8 ] ; then c[8]=$final ; fi
    if [ $p -gt 9 ] ; then c[9]=$final ; fi
done

printf "\r[${c[0]}${c[1]}${c[2]}${c[3]}${c[4]}${c[5]}${c[6]}${c[7]}${c[8]}${c[9]}] Done.                    \n"
