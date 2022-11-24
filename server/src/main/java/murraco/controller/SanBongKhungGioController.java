package murraco.controller;


import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import murraco.model.SanBong;
import murraco.model.SanBongKhungGio;
import murraco.repository.SanBongKhungGioRepository;
import murraco.repository.SanBongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("users")
@Api(tags = "users")
@RequiredArgsConstructor
public class SanBongKhungGioController {
    @Autowired
    private SanBongKhungGioRepository sanBongKhungGioRepository;

    @GetMapping("/sanbong")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<SanBongKhungGio> get() {
        return sanBongKhungGioRepository.findAll();
    }
}