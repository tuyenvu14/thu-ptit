package murraco.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import murraco.model.KhachHang;
import murraco.repository.KhachHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("users")
@Api(tags = "users")
@RequiredArgsConstructor
public class KhachHangController {
    @Autowired
    private KhachHangRepository khachHangRepository;

    @GetMapping("/khachhang")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<KhachHang> searchCustomer( String keyword,  int offset,  int limit ) {
        Pageable pageable = PageRequest.of(offset, limit, Sort.by(Sort.Direction.ASC, "id"));
        return  khachHangRepository.searchCustomers(keyword, pageable);
    }
}
