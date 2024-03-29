package com.mybrary.backend.domain.contents.thread.service;

import com.mybrary.backend.domain.contents.thread.dto.requestDto.ThreadPostDto;
import com.mybrary.backend.domain.contents.thread.dto.requestDto.ThreadUpdateDto;
import com.mybrary.backend.domain.contents.thread.dto.responseDto.GetThreadDto;
import com.mybrary.backend.domain.contents.thread.dto.responseDto.ThreadInfoGetDto;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ThreadService {

    Long createThread(String email, ThreadPostDto threadPostDto);

    Long updateThread(String email, ThreadUpdateDto threadUpdateDto);

    int deleteThread(Long myId, Long threadId);

    List<GetThreadDto> getMainAllThread(Long myId, int page);

    List<ThreadInfoGetDto> getMyAllThread(Long myId, Pageable pageable);

    List<ThreadInfoGetDto> getOtherAllThread(String email, Long memberId, Pageable pageable);

    GetThreadDto getThread(String email, Long memberId, Long threadId);
}
