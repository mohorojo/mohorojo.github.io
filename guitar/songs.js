// 기타 코드 타브 사전
const chordTabs = {
    'C': `e|--0--|
B|--1--|
G|--0--|
D|--2--|
A|--3--|
E|--x--|`,
    'Am': `e|--0--|
B|--1--|
G|--2--|
D|--2--|
A|--0--|
E|--x--|`,
    'F': `e|--1--|
B|--1--|
G|--2--|
D|--3--|
A|--3--|
E|--1--|`,
    'G': `e|--3--|
B|--0--|
G|--0--|
D|--0--|
A|--2--|
E|--3--|`,
    'Em': `e|--0--|
B|--0--|
G|--0--|
D|--2--|
A|--2--|
E|--0--|`,
    'Dm': `e|--1--|
B|--3--|
G|--2--|
D|--0--|
A|--x--|
E|--x--|`,
    'G7': `e|--1--|
B|--0--|
G|--0--|
D|--0--|
A|--2--|
E|--3--|`,
    'Em7': `e|--0--|
B|--3--|
G|--0--|
D|--2--|
A|--2--|
E|--0--|`,
    'D': `e|--2--|
B|--3--|
G|--2--|
D|--0--|
A|--x--|
E|--x--|`,
    'A': `e|--0--|
B|--2--|
G|--2--|
D|--2--|
A|--0--|
E|--x--|`,
    'E': `e|--0--|
B|--0--|
G|--1--|
D|--2--|
A|--2--|
E|--0--|`,
    'Bm': `e|--2--|
B|--3--|
G|--4--|
D|--4--|
A|--2--|
E|--x--|`,
    'C7': `e|--0--|
B|--1--|
G|--3--|
D|--2--|
A|--3--|
E|--x--|`,
    'Am7': `e|--0--|
B|--1--|
G|--0--|
D|--2--|
A|--0--|
E|--x--|`,
    'Fmaj7': `e|--0--|
B|--1--|
G|--2--|
D|--3--|
A|--x--|
E|--1--|`
};

// 샘플 곡 데이터 (저작권이 없는 전통곡만)
const sampleSongs = [
    {
        title: "Amazing Grace",
        artist: "Traditional",
        tabs: "", 
        lyrics: `[C, 4/4 느리게]Amazing [F, 4/4 느리게]grace, [C, 4/4 느리게]how sweet the [G, 4/4 느리게]sound
[C, 4/4 느리게]That saved a [F, 4/4 느리게]wretch like [C, 4/4 느리게]me
[C, 4/4 느리게]I once was [F, 4/4 느리게]lost, but [C, 4/4 느리게]now I'm [G, 4/4 느리게]found
[C, 4/4 느리게]Was blind, but [F, 4/4 느리게]now I [C, 4/4 느리게]see

[C, 4/4 느리게]'Twas grace that [F, 4/4 느리게]taught my [C, 4/4 느리게]heart to [G, 4/4 느리게]fear
[C, 4/4 느리게]And grace my [F, 4/4 느리게]fears re[C, 4/4 느리게]lieved
[C, 4/4 느리게]How precious [F, 4/4 느리게]did that [C, 4/4 느리게]grace ap[G, 4/4 느리게]pear
[C, 4/4 느리게]The hour I [F, 4/4 느리게]first be[C, 4/4 느리게]lieved`
    }
];

// 저작권이 있는 곡 제목들 (자동 제거용)
const copyrightedTitles = [
    "Wonderwall", 
    "호텔 캘리포니아", 
    "Let It Be", 
    "캠프파이어", 
    "Stand By Me", 
    "House of the Rising Sun"
];