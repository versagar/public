const thirdSegment = localStorage.getItem('thirdSegmentafterconnect');
        localStorage.removeItem('thirdSegmentafterconnect');
        if (thirdSegment) {
            switch (thirdSegment) {
                case 'mechanical-robotics':
                    loadIn('wbody', '/sa6ang2rha7lay9/t6w2c7pfs/mroboticstwc.html');
                    break;
                default:
                    loadObject('wbody', '/file-error.html');
                    break;
            }
        }