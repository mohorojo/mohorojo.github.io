// 전역 변수
let songs = JSON.parse(localStorage.getItem('guitarSongs')) || [];
let currentSongIndex = -1;
let editingIndex = -1;

// 코드와 가사 파싱 함수
function parseChordLyrics(text) {
    if (!text) return '';
    
    const lines = text.split('\n');
    let result = '';
    
    lines.forEach(line => {
        if (line.trim() === '') {
            return;
        }
        
        // [코드, 비트] 형식을 찾는 정규식
        const chordBeatRegex = /\[([^,\]]+),\s*([^\]]+)\]/g;
        let match;
        
        while ((match = chordBeatRegex.exec(line)) !== null) {
            const chord = match[1].trim();
            const beat = match[2].trim();
            const fullMatch = match[0];
            const matchIndex = match.index;
            
            // 현재 매치 다음부터 다음 매치까지의 가사 추출
            const restOfLine = line.substring(matchIndex + fullMatch.length);
            let nextMatch = chordBeatRegex.exec(line);
            
            let lyrics;
            if (nextMatch) {
                // 다음 코드가 있으면 그 위치까지의 텍스트
                const nextIndex = nextMatch.index - (matchIndex + fullMatch.length);
                lyrics = restOfLine.substring(0, nextIndex).trim();
                // 정규식 인덱스 되돌리기
                chordBeatRegex.lastIndex = matchIndex + fullMatch.length;
            } else {
                // 마지막 코드면 나머지 모든 텍스트
                lyrics = restOfLine.trim();
            }
            
            // 코드에 해당하는 타브 가져오기
            const tab = chordTabs[chord] || `코드 정보 없음: ${chord}`;
            
            if (lyrics || chord) {
                result += `
                    <div class="chord-section">
                        <div class="chord-tab">${tab}</div>
                        <div class="chord-name">${chord}</div>
                        <div class="chord-beat">♪ ${beat}</div>
                        <div class="chord-lyrics">${lyrics || '(연주만)'}</div>
                    </div>
                `;
            }
        }
    });
    
    return result;
}

// 곡 목록 렌더링
function renderSongList() {
    const songList = document.getElementById('songList');
    const emptyState = document.getElementById('emptyState');
    
    if (songs.length === 0) {
        songList.innerHTML = '';
        emptyState.style.display = 'block';
        document.getElementById('songDisplay').style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    
    songList.innerHTML = songs.map((song, index) => `
        <div class="song-card ${index === currentSongIndex ? 'active' : ''}" onclick="selectSong(${index})">
            <h3>${song.title}</h3>
            <p>${song.artist || '알 수 없는 아티스트'}</p>
            <div style="margin-top: 10px;">
                <button onclick="editSong(${index}); event.stopPropagation();" style="background: none; border: none; color: white; cursor: pointer; margin-right: 10px;">✏️ 수정</button>
                <button onclick="deleteSong(${index}); event.stopPropagation();" style="background: none; border: none; color: white; cursor: pointer;">🗑️ 삭제</button>
            </div>
        </div>
    `).join('');
}

// 곡 선택
function selectSong(index) {
    currentSongIndex = index;
    const song = songs[index];
    
    document.getElementById('currentTitle').textContent = song.title;
    document.getElementById('currentArtist').textContent = song.artist || '';
    document.getElementById('chordSections').innerHTML = parseChordLyrics(song.lyrics);
    
    document.getElementById('songDisplay').style.display = 'block';
    renderSongList();
}

// 모달 관련 함수들
function openAddModal() {
    editingIndex = -1;
    document.getElementById('modalTitle').textContent = '새 곡 추가';
    document.getElementById('songForm').reset();
    document.getElementById('songModal').style.display = 'block';
}

function editSong(index) {
    editingIndex = index;
    const song = songs[index];
    
    document.getElementById('modalTitle').textContent = '곡 수정';
    document.getElementById('songTitle').value = song.title;
    document.getElementById('songArtist').value = song.artist || '';
    document.getElementById('songLyrics').value = song.lyrics;
    document.getElementById('songModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('songModal').style.display = 'none';
}

// 곡 삭제
function deleteSong(index) {
    if (confirm('이 곡을 삭제하시겠습니까?')) {
        songs.splice(index, 1);
        if (currentSongIndex === index) {
            currentSongIndex = -1;
            document.getElementById('songDisplay').style.display = 'none';
        } else if (currentSongIndex > index) {
            currentSongIndex--;
        }
        saveSongs();
        renderSongList();
    }
}

// 저장 관련 함수들
function saveSongs() {
    localStorage.setItem('guitarSongs', JSON.stringify(songs));
}

function clearAllSongs() {
    if (confirm('모든 곡을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        songs = [];
        currentSongIndex = -1;
        saveSongs();
        renderSongList();
    }
}

function exportSongs() {
    const dataStr = JSON.stringify(songs, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'guitar_songs.json';
    link.click();
    URL.revokeObjectURL(url);
}

// 샘플 곡 초기화
function initializeSampleSongs() {
    // 기존 곡들이 있으면 전부 삭제하고 새로 시작
    if (songs.length === 0) {
        // 처음 방문시 샘플 곡 추가
        songs = [...sampleSongs];
        saveSongs();
    } else {
        let needsUpdate = false;
        
        // 저작권이 있는 곡들 제거
        const filteredSongs = songs.filter(song => {
            if (copyrightedTitles.includes(song.title)) {
                needsUpdate = true;
                return false;
            }
            return true;
        });
        
        if (needsUpdate) {
            songs = filteredSongs;
        }
        
        // Amazing Grace 업데이트 (기존 형식이든 새 형식이든)
        const amazingGraceIndex = songs.findIndex(song => song.title === "Amazing Grace");
        if (amazingGraceIndex >= 0) {
            // 기존 Amazing Grace를 새 비트 형식으로 교체
            songs[amazingGraceIndex] = sampleSongs[0];
            needsUpdate = true;
        } else {
            // Amazing Grace가 없으면 추가
            songs.unshift(sampleSongs[0]); // 맨 앞에 추가
            needsUpdate = true;
        }
        
        if (needsUpdate) {
            saveSongs();
            
            // 현재 선택된 곡이 삭제되었는지 확인
            if (currentSongIndex >= songs.length) {
                currentSongIndex = -1;
                document.getElementById('songDisplay').style.display = 'none';
            } else if (currentSongIndex === amazingGraceIndex || (amazingGraceIndex === -1 && currentSongIndex === 0)) {
                // Amazing Grace가 업데이트되었고 현재 선택중이면 다시 렌더링
                selectSong(currentSongIndex);
            }
        }
    }
    
    renderSongList();
}

// 이벤트 리스너들
document.addEventListener('DOMContentLoaded', function() {
    // 폼 제출 이벤트
    document.getElementById('songForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const songData = {
            title: document.getElementById('songTitle').value.trim(),
            artist: document.getElementById('songArtist').value.trim(),
            tabs: '', // 더 이상 사용하지 않음
            lyrics: document.getElementById('songLyrics').value.trim()
        };
        
        if (!songData.title || !songData.lyrics) {
            alert('곡 제목과 가사는 필수입니다.');
            return;
        }
        
        if (editingIndex >= 0) {
            songs[editingIndex] = songData;
            if (currentSongIndex === editingIndex) {
                selectSong(editingIndex);
            }
        } else {
            songs.push(songData);
        }
        
        saveSongs();
        closeModal();
        renderSongList();
    });

    // 모달 외부 클릭 시 닫기
    window.onclick = function(event) {
        const modal = document.getElementById('songModal');
        if (event.target === modal) {
            closeModal();
        }
    };

    // 초기화
    initializeSampleSongs();
});