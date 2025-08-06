/**
 * 케틀벨 운동 프로그램 프리셋
 * Pure HTML/JavaScript 환경을 위한 브라우저 호환 버전
 * 7일 로테이션 시스템에 맞춘 요일별 운동 프로그램
 */

// 운동 타입 매핑 (전역 변수)
const WORKOUT_TYPES = {
    0: '액티브리커버리', // 일요일
    1: '더블16kg데뷔', // 월요일
    2: '더블싱글혼합', // 화요일
    3: '더블16kg마스터리', // 수요일
    4: '다중무게콤비네이션', // 목요일
    5: '더블16kg파워', // 금요일
    6: '페어링시스템' // 토요일
};

// 요일명 (전역 변수)
const DAY_NAMES = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

// 요일별 기본 운동 프로그램 (전역 변수)
const WORKOUT_PROGRAMS = {
    // 일요일 - 액티브 리커버리
    0: [
        {
            name: '케틀벨요가플로우',
            weight: '16kg',
            sets: '1',
            reps: '60초',
            description: '머리 둘레로 케틀벨 돌리기 + 고블릿 스쿼트 + 오버헤드 리치'
        },
        {
            name: '브리딩레더',
            weight: '16kg×2',
            sets: '1',
            reps: '55회',
            description: '10회→9회→8회...→1회, 각 세트 사이 5회 심호흡'
        },
        {
            name: '모빌리티캐리투어',
            weight: '16kg',
            sets: '1',
            reps: '240초',
            description: '프론트→사이드→오버헤드→파머스 홀드 포지션 변경'
        },
        {
            name: '리스토레이티브홀드',
            weight: '16kg',
            sets: '1',
            reps: '180초',
            description: '가슴에 안고 명상적 심호흡, 깊고 천천히'
        }
    ],

    // 월요일 - 더블 16kg 데뷔
    1: [
        {
            name: '더블16kg데드리프트',
            weight: '16kg×2',
            sets: '4',
            reps: '48',
            description: '양손에 16kg씩, 엉덩이 중심 움직임, 허리 중립 유지'
        },
        {
            name: '더블16kg로우',
            weight: '16kg×2',
            sets: '4',
            reps: '40',
            description: '힌지 포지션에서 양팔로 로우, 어깨날개 모으며'
        },
        {
            name: '더블16kg플로어프레스',
            weight: '16kg×2',
            sets: '4',
            reps: '36',
            description: '바닥에 누워서 양손으로 프레스, 허리 완전히 바닥에'
        },
        {
            name: '더블16kg파머스캐리',
            weight: '16kg×2',
            sets: '4',
            reps: '180초',
            description: '양손에 16kg씩 들고 제자리 걸음, 어깨 안정성과 코어'
        }
    ],

    // 화요일 - 더블+싱글 혼합
    2: [
        {
            name: '더블16kg프론트스쿼트',
            weight: '16kg×2',
            sets: '4',
            reps: '52',
            description: '양손에 16kg씩 랙 포지션, 90도까지만 깊지 않게'
        },
        {
            name: '싱글20kg오프셋캐리',
            weight: '20kg+16kg',
            sets: '4',
            reps: '160초',
            description: '한 손에 20kg, 반대 손에 16kg, 불균형 적응'
        },
        {
            name: '더블16kg오버헤드홀드',
            weight: '16kg×2',
            sets: '4',
            reps: '100초',
            description: '양손으로 머리 위 정적 유지, 어깨 안정성'
        },
        {
            name: '20kg싱글암로우+16kg홀드',
            weight: '20kg+16kg',
            sets: '4',
            reps: '32회',
            description: '한 손으로 20kg 로우, 반대 손은 16kg 홀드'
        }
    ],

    // 수요일 - 더블 16kg 마스터리
    3: [
        {
            name: '더블16kg플로어프레스',
            weight: '16kg×2',
            sets: '4',
            reps: '32',
            description: '바닥에 누워서 양손으로 프레스, 타바타 스타일'
        },
        {
            name: '더블16kg고블릿스쿼트',
            weight: '16kg×2',
            sets: '4',
            reps: '40',
            description: '양손에 16kg씩, 가슴 높이에서 스쿼트'
        },
        {
            name: '더블16kg파머스캐리',
            weight: '16kg×2',
            sets: '4',
            reps: '180초',
            description: '양손에 16kg씩 들고 걷기, 코어 안정성'
        },
        {
            name: '더블16kg클린투프론트스쿼트',
            weight: '16kg×2',
            sets: '4',
            reps: '24',
            description: '바닥→어깨→프론트스쿼트 연결 동작'
        },
        {
            name: '더블16kg푸시프레스',
            weight: '16kg×2',
            sets: '4',
            reps: '20',
            description: '어깨에서 머리 위로, 다리 반동 이용'
        }
    ],

    // 목요일 - 다중 무게 콤비네이션
    4: [
        {
            name: '그래듀에이티드캐리',
            weight: '16-20-22.5kg',
            sets: '3',
            reps: '9세트',
            description: '16kg→20kg→22.5kg 순서로 각 15초씩 캐리'
        },
        {
            name: '아센딩세트스쿼트',
            weight: '16kg×2→22.5kg',
            sets: '3',
            reps: '45회',
            description: '더블 16kg(15회)→싱글 22.5kg(8회) 연속'
        },
        {
            name: '트라이세트로우',
            weight: '16-20-22.5kg',
            sets: '3',
            reps: '23회',
            description: '16kg(10회)→20kg(8회)→22.5kg(5회) 좌우 각각'
        },
        {
            name: '웨이브프레스',
            weight: '16kg×2→20kg→24kg',
            sets: '3',
            reps: '18회',
            description: '더블16kg→싱글20kg→싱글24kg 각 5-8회'
        },
        {
            name: '피라미드홀드',
            weight: '16-20-24kg',
            sets: '3',
            reps: '135초',
            description: '16kg(20초)→20kg(15초)→24kg(10초) 연속'
        }
    ],

    // 금요일 - 더블 16kg 파워
    5: [
        {
            name: '더블16kg쓰러스터',
            weight: '16kg×2',
            sets: '4',
            reps: '28',
            description: '프론트스쿼트에서 일어나며 오버헤드 프레스'
        },
        {
            name: '더블16kg로우투하이풀',
            weight: '16kg×2',
            sets: '4',
            reps: '36',
            description: '로우 동작에서 높게 당겨올리기, 등과 어깨 후면'
        },
        {
            name: '더블16kg오버헤드캐리',
            weight: '16kg×2',
            sets: '4',
            reps: '160초',
            description: '양손으로 머리 위에서 캐리, 어깨 안정성 극대화'
        },
        {
            name: '더블16kg런지홀드',
            weight: '16kg×2',
            sets: '4',
            reps: '160초',
            description: '런지 자세로 양손에 케틀벨, 좌우 20초씩 교대'
        },
        {
            name: '더블16kg파머스캐리',
            weight: '16kg×2',
            sets: '1',
            reps: '120초',
            description: '파이널 번아웃, 2분간 지속'
        }
    ],

    // 토요일 - 페어링 시스템
    6: [
        {
            name: '더블16kg벤트오버로우',
            weight: '16kg×2',
            sets: '3',
            reps: '36',
            description: '수퍼세트A - 등 전체 근육 강화'
        },
        {
            name: '더블16kg오버헤드프레스',
            weight: '16kg×2',
            sets: '3',
            reps: '24',
            description: '수퍼세트A - 어깨 전체 근육 강화'
        },
        {
            name: '더블16kg고블릿스쿼트',
            weight: '16kg×2',
            sets: '3',
            reps: '45',
            description: '수퍼세트B - 하체 전체 근육 강화'
        },
        {
            name: '더블16kg루마니안데드리프트',
            weight: '16kg×2',
            sets: '3',
            reps: '30',
            description: '수퍼세트B - 후면사슬 강화'
        },
        {
            name: '더블16kg프론트랙홀드',
            weight: '16kg×2',
            sets: '2',
            reps: '60초',
            description: '수퍼세트C - 코어와 어깨 안정성'
        }
    ]
};

// 운동 강도 가이드라인 (주차별) - 전역 변수
const INTENSITY_GUIDELINES = {
    week1_2: {
        description: "적응기 - 더블 케틀벨 균형감각 습득",
        intensity: "70%",
        focus: "동작 익히기, 폼 완성",
        tips: ["가벼운 무게로 시작", "정확한 폼 우선", "충분한 휴식"]
    },
    week3_4: {
        description: "발전기 - 좌우 동시 동작의 완성도",
        intensity: "80%",
        focus: "더 복잡한 조합 동작",
        tips: ["동작 연결성 향상", "밸런스 감각 발달", "점진적 강도 증가"]
    },
    week5_6: {
        description: "강화기 - 더블 케틀벨의 폭발력 개발",
        intensity: "85-90%",
        focus: "무거운 무게와의 혼합 사용",
        tips: ["파워 개발", "스피드 향상", "고강도 적응"]
    },
    week7_8: {
        description: "마스터기 - 창의적 조합과 개인 기록",
        intensity: "90-95%",
        focus: "더블 20kg 도전 준비",
        tips: ["개인 기록 도전", "복합 동작 마스터", "차기 프로그램 준비"]
    }
};

// 운동별 주의사항 및 팁 - 전역 변수
const EXERCISE_TIPS = {
    "더블케틀벨_일반": [
        "양손 케틀벨의 타이밍을 정확히 맞추세요",
        "좌우 케틀벨의 높이와 각도를 일치시키세요",
        "더블 부하에 맞는 적절한 호흡 패턴을 유지하세요",
        "처음에는 가벼운 무게로 협응력부터 기르세요"
    ],
    "허리보호": [
        "모든 동작에서 허리 중립 자세를 유지하세요",
        "코어를 사전에 활성화하고 시작하세요",
        "통증이나 불편함을 느끼면 즉시 중단하세요",
        "워밍업과 쿨다운을 절대 건너뛰지 마세요"
    ],
    "점진적_발전": [
        "첫 주는 가벼운 무게로 폼을 익히세요",
        "매주 1-2회씩 반복 횟수를 늘려가세요",
        "컨디션이 좋지 않으면 강도를 줄이세요",
        "무게 증가는 폼이 완벽해진 후에 하세요"
    ],
    "안전수칙": [
        "케틀벨 주변에 충분한 공간을 확보하세요",
        "바닥이 미끄럽지 않은지 확인하세요",
        "운동 전 관절과 근육을 충분히 풀어주세요",
        "물을 충분히 준비하고 수시로 수분 보충하세요"
    ]
};

// 프리셋 관련 유틸리티 함수들 - 전역 함수
function getProgramByDay(dayIndex) {
    return WORKOUT_PROGRAMS[dayIndex] || [];
}

function getWorkoutTypeName(dayIndex) {
    return WORKOUT_TYPES[dayIndex] || '알 수 없음';
}

function getDayName(dayIndex) {
    return DAY_NAMES[dayIndex] || '알 수 없음';
}

function getIntensityGuide(week) {
    if (week <= 2) return INTENSITY_GUIDELINES.week1_2;
    if (week <= 4) return INTENSITY_GUIDELINES.week3_4;
    if (week <= 6) return INTENSITY_GUIDELINES.week5_6;
    return INTENSITY_GUIDELINES.week7_8;
}

function getExerciseTips(category) {
    return EXERCISE_TIPS[category] || [];
}

function getWeeklyOverview() {
    const overview = [];
    for (let i = 0; i < 7; i++) {
        overview.push({
            day: DAY_NAMES[i],
            workoutType: WORKOUT_TYPES[i],
            exerciseCount: WORKOUT_PROGRAMS[i].length,
            mainFocus: getMainFocus(i)
        });
    }
    return overview;
}

function getMainFocus(dayIndex) {
    const focuses = {
        0: "회복과 이동성",
        1: "더블 케틀벨 기초",
        2: "무게 조합 훈련",
        3: "기술 완성도",
        4: "창의적 조합",
        5: "최대 파워",
        6: "균형과 대칭"
    };
    return focuses[dayIndex] || "전반적 체력";
}

// 추가 헬퍼 함수들
function getWorkoutDescription(dayIndex, exerciseIndex) {
    const program = WORKOUT_PROGRAMS[dayIndex];
    if (program && program[exerciseIndex]) {
        return program[exerciseIndex].description || '';
    }
    return '';
}

function getTotalExerciseCount(dayIndex) {
    const program = WORKOUT_PROGRAMS[dayIndex];
    return program ? program.length : 0;
}

function getEstimatedDuration(dayIndex) {
    const durations = {
        0: 25, // 액티브 리커버리
        1: 30, // 더블16kg데뷔
        2: 32, // 더블싱글혼합
        3: 30, // 더블16kg마스터리 (타바타)
        4: 32, // 다중무게콤비네이션
        5: 35, // 더블16kg파워 (파이널 번아웃 포함)
        6: 28  // 페어링시스템
    };
    return durations[dayIndex] || 30;
}

// 운동 프로그램 검증 함수
function validateWorkoutProgram() {
    let isValid = true;
    let errors = [];
    
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const program = WORKOUT_PROGRAMS[dayIndex];
        if (!program || program.length === 0) {
            errors.push(`${DAY_NAMES[dayIndex]} 프로그램이 비어있습니다.`);
            isValid = false;
        } else {
            program.forEach((exercise, index) => {
                if (!exercise.name) {
                    errors.push(`${DAY_NAMES[dayIndex]} ${index + 1}번째 운동의 이름이 없습니다.`);
                    isValid = false;
                }
                if (!exercise.weight) {
                    errors.push(`${DAY_NAMES[dayIndex]} ${index + 1}번째 운동의 무게가 설정되지 않았습니다.`);
                    isValid = false;
                }
            });
        }
    }
    
    return { isValid, errors };
}

// 디버깅을 위한 콘솔 출력 (개발용)
function printWorkoutSummary() {
    console.log('🏋️‍♂️ 케틀벨 운동 프로그램 요약');
    console.log('================================');
    
    for (let i = 0; i < 7; i++) {
        const program = WORKOUT_PROGRAMS[i];
        console.log(`${DAY_NAMES[i]} (${WORKOUT_TYPES[i]}): ${program.length}개 운동`);
        program.forEach((exercise, index) => {
            console.log(`  ${index + 1}. ${exercise.name} - ${exercise.weight} × ${exercise.sets}세트 ${exercise.reps}`);
        });
        console.log('');
    }
}

// 개발 모드에서만 실행 (선택사항)
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('🎯 케틀벨 운동 프리셋이 로드되었습니다.');
    const validation = validateWorkoutProgram();
    if (validation.isValid) {
        console.log('✅ 모든 운동 프로그램이 정상적으로 설정되었습니다.');
    } else {
        console.warn('⚠️ 운동 프로그램에 문제가 있습니다:', validation.errors);
    }
}